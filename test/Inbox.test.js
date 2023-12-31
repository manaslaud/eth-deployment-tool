  const assert = require('assert');
  const ganache = require('ganache');
  const { Web3 } = require('web3');
  const web3 = new Web3(ganache.provider());
  const { interface, bytecode } = require("../compile");

  let accounts;
  let Lottery;

  beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    Lottery = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({
        data: bytecode,
      })
      .send({ from: accounts[0], gas: "1000000" });
  });

  describe("Lottery Contract Tests", () => {
    it("deploys a Lottery contract", () => {
    assert(Lottery.options.address)
    });
    //
    it("allows one acc to enter",async ()=>{
      await Lottery.methods.enter().send({
        from:accounts[0],
        value:web3.utils.toWei(`0.02`,`ether`)
      })
      const players = await Lottery.methods.getPlayers().call({
        from:accounts[0]
      })
      assert.ok(accounts[0]==players[0],`Failed`)
      assert.ok(1==players.length,`Failed`)
    //
  
    })
    it("allows multiple acc to enter",async ()=>{
      await Lottery.methods.enter().send({
        from:accounts[1],
        value:web3.utils.toWei(`0.02`,`ether`)
      })
      await Lottery.methods.enter().send({
        from:accounts[2],
        value:web3.utils.toWei(`0.02`,`ether`)
      })
      await Lottery.methods.enter().send({
        from:accounts[3],
        value:web3.utils.toWei(`0.02`,`ether`)
      })
      const players = await Lottery.methods.getPlayers().call({
        from:accounts[0]
      })
      assert.ok(accounts[1]==players[0],`Failed 1`)
      assert.ok(accounts[2]==players[1],`Failed 2`)
      assert.ok(accounts[3]==players[2],`Failed 3`)
      assert.ok(3==players.length,`Failed length test`)

    })

  });
