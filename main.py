from flask import Flask, request, jsonify
import ipfshttpclient
import os
from cryptography.fernet import Fernet
from web3 import Web3

app = Flask(__name__)


w3 = Web3(Web3.HTTPProvider("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"))
contract_address = "YOUR_SMART_CONTRACT_ADDRESS"
contract_abi = []  # Load your smart contract ABI
vault_contract = w3.eth.contract(address=contract_address, abi=contract_abi)


ipfs_client = ipfshttpclient.connect()


encryption_key = Fernet.generate_key()
cipher = Fernet(encryption_key)

@app.route("/upload", methods=["POST"])
def upload_file():
    file = request.files['file']
    file_data = file.read()
    encrypted_data = cipher.encrypt(file_data)
    
    with open("temp.enc", "wb") as temp_file:
        temp_file.write(encrypted_data)
    
    ipfs_hash = ipfs_client.add("temp.enc")['Hash']
    os.remove("temp.enc")
    
    return jsonify({"ipfs_hash": ipfs_hash})

@app.route("/download", methods=["GET"])
def download_file():
    ipfs_hash = request.args.get("hash")
    
    ipfs_client.get(ipfs_hash, "temp.enc")
    with open("temp.enc", "rb") as temp_file:
        encrypted_data = temp_file.read()
    os.remove("temp.enc")
    
    decrypted_data = cipher.decrypt(encrypted_data)
    
    return decrypted_data

@app.route("/store_hash", methods=["POST"])
def store_hash():
    data = request.json
    user_address = data["user_address"]
    ipfs_hash = data["ipfs_hash"]
    
    tx = vault_contract.functions.storeFileHash(user_address, ipfs_hash).transact({"from": user_address})
    return jsonify({"transaction": tx.hex()})

@app.route("/get_hash", methods=["GET"])
def get_hash():
    user_address = request.args.get("user_address")
    stored_hash = vault_contract.functions.getFileHash(user_address).call()
    return jsonify({"ipfs_hash": stored_hash})

if __name__ == "__main__":
    app.run(debug=True)
