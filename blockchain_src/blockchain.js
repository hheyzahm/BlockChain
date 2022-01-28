
const SHA256=require('crypto-js/sha256');

//creating class named Block to store data of block for blockchain
class Block{
    // constructor of Block 
    constructor(index,timestamp,data,previousHash=''){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash= this.calculateHash()
    }
    //function to calculate Hash of data member for block
  calculateHash(){
        return SHA256(this.index+this.timestamp+this.previousHash+JSON.stringify(this.data)).toString()
    }
}


// creating class Block Chain to make ledger of Cblock together 
class BlockChain{
    // constructor for blockchain which start with genesisblock which is first block of ledger
    constructor(){
        this.chain=[this.createGenesisBlock()]
    }
    //function for create genesisblock which is first block of ledger
    createGenesisBlock(){
        // return new genesisBlock after creating genesis block aka first block of ledger
        return new Block(0,'9/02/2021',"Wellcome..First Block","0")
    }
    // function for getting last block of ledger
    getLatestBlock(){
        // return the last block of ledger 
        // length-1 because of lsit index start from 0 to length
        return this.chain[this.chain.length-1]
    }
    //function for adding  new block in chain  
    addBlock(newBlock){
        // setting the previous Hash equal to hash of last block of ledger
       newBlock.previousHash=this.getLatestBlock().hash
       // setting new hash for block by using function calculateHash() from Block class
       newBlock.hash=newBlock.calculateHash()
       // after setting preious hash and calculationg new hash push new block in ledger
       this.chain.push(newBlock)
    }
    // checking wheather ledger is valid or not
    isChainValid(){
        //running for loop from 1 because of genesisBlock to length of ledger
        for(let i=1; i<this.chain.length;i++){
            //creating temp variable name currentBlock
         const currentBlock=this.chain[i]
         const previousblock=this.chain[i-1]
         if(currentBlock.hash!=currentBlock.calculateHash()){
             return false
         }
         if (currentBlock.previousHash!=previousblock.hash){
             return false
         }
        }
        return true
    }

}

myBitcoin =new BlockChain();
myBitcoin.addBlock(new Block(1,"09/02/2021",{amount:4}));
myBitcoin.addBlock(new Block(2,"09/02/2021",{amount:10}));
console.log(JSON.stringify(myBitcoin,null,4));
console.log(myBitcoin.isChainValid())