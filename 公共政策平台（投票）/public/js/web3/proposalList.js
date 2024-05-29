var web3 = new Web3(Web3.givenProvider || 'HTTP://127.0.0.1:8545' || 'ws://localhost:8546');
console.log(web3);
// let yzgAccount = []
if (typeof window.ethereum == 'undefined') {
	alert("你还没下载metamask")
}
const abi =[
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "lyy_power",
				"type": "address[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "lyy_pName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "lyy_pCtx",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "lyy_limitTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lyy_price",
				"type": "uint256"
			}
		],
		"name": "lyycreateProposal",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "lyy_power",
				"type": "address"
			}
		],
		"name": "lyydelPower",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "pId",
				"type": "uint256"
			}
		],
		"name": "lyydoVoting",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lyygetMoney",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "eventType",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_proposalId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_limitTime",
				"type": "uint256"
			}
		],
		"name": "lyyProposeEvt",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "eventType",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_voter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "lyyVoteEvt",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "lyyallId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lyyGetAllId",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lyygetBlockTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "lyy_t",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "pId",
				"type": "uint256"
			}
		],
		"name": "lyygetProposalCtx",
		"outputs": [
			{
				"internalType": "string",
				"name": "lyy_s",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "pId",
				"type": "uint256"
			}
		],
		"name": "lyygetProposalLimit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "lyy_t",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "pId",
				"type": "uint256"
			}
		],
		"name": "lyygetProposalName",
		"outputs": [
			{
				"internalType": "string",
				"name": "lyy_s",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "pId",
				"type": "uint256"
			}
		],
		"name": "lyygetProposalVCnt",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "lyy_v",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lyyisPower",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "lyypowers",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "lyyproposals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "lyyid",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "lyypName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "lyypCtx",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "lyychairperson",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "lyyvoteCount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "lyyinitialized",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "lyylimitTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lyyprice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lyytotalCost",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lyyqueryBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "pId",
				"type": "uint256"
			}
		],
		"name": "lyyqueryVoteNUm",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "pId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "voterAddr",
				"type": "address"
			}
		],
		"name": "lyyqueryVoting",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

let myContract = new web3.eth.Contract(abi, '0x583FA53841F90A064ca00B612f15D936d0e3e629');







let allId = []
let proposals = []

myContract.methods.lyyGetAllId().call().then((result) => {
	allId = result

})

$('.viewP').click(function () {
	for (let i = 0; i < allId.length; i++) {
		let r = getP(allId, i)
		r.then((p) => {
			proposals.push(p)
			console.log(proposals)
			setTimeout(function(){
				if (i == allId.length - 1) {
					str = ""
					for (let j = 0; j < proposals.length; j++) {
						console.log(proposals)
						str += `<tr>
						<td>${proposals[j].lyyid}</td>
						<td>${proposals[j].lyypName}</td>
						<td>${proposals[j].lyyvoteCount}</td>
						<td>${parseInt(proposals[j].lyyprice) / 1000000000000000000}ETH</td>
						<td>${dateFormt(proposals[j].lyylimitTime)}</td>
						<td>${proposals[j].lyytotalCost}</td>z
					</tr>`
					}
	
					$(".tbody").html(str)
					proposals = []
				}
			},10)
			
		})
	}
	// console.log(proposals)
})


async function getP(allId, i) {
	let p = new Promise((res, rej) => {
		myContract.methods.lyyproposals(allId[i]).call().then((result2) => {
			res(result2)
		})
	})
	let r = await p
	return r
}
function dateFormt(d) {
	console.log(d)
	// 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
	let date = new Date(d * 1000);
	let Y = date.getFullYear() + '-';
	let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	let D = date.getDate() + ' ';
	let h = date.getHours() + ':';
	let m = date.getMinutes() + ':';
	let s = date.getSeconds();
	console.log(Y + M + D + h + m + s);
	return (Y + M + D + h + m + s)
	// 输出结果：2014-04-23 18:55:49
}


$('.vote').click(() => {
	web3.eth.getAccounts().then((accounts) => {
		let id = $('#id').val()
		let cost = $('#cost').val() + "000000000000000000"
		myContract.methods.lyydoVoting(id).send({
			from: accounts[0],
			value: cost,
			gas: 1500000,
			gasPrice: '30000000'
		}).on('error', function (error, receipt) {
			alert("交易失败")
		})
	})

})