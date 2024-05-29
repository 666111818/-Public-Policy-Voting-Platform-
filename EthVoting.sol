//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./erc20Contracts/token/ERC20/ERC20.sol";

contract EthVoting is ERC20("LYYToken", "LYY") {

	address[] public powers;

	mapping(address => bool) public isPower;

    //初始化代币数量
    constructor(address[] memory _power) {
        _mint(msg.sender, 1000 * 10**uint256(decimals()));
        transfer(address(this), uint256((totalSupply() * 80) / 100));

		 require(_power.length > 0, "power required");

        for (uint i = 0; i < _power.length; i++) {
            address p = _power[i];

            require(p != address(0), "invalid owner");
            require(!isPower[p], "owner not unique");

            isPower[p] = true;
            powers.push(p);
        }
    }

    //附议人信息
    struct Voter {
        uint256 voteTimeStamp; //投票时的区块时间
        bool initialized; //判断是否投过票的标志
        uint256 votePrice; //附议费用
    }

    //提案内容
    struct Proposal {
        uint256 id; //提案ID
        string pName; //提案标题
        string pCtx; //提案内容
        address chairperson; //提案主持人
        uint256 voteCount; //附议人数
        bool initialized; //判断提案是否存在的标志
        uint256 limitTime; //附议限制时间
        uint256 price; //附议费用
        uint256 totalCost; //提案费用总计
        mapping(address => Voter) voters; //附议列表
    }

    //所有提案编号
    uint256[] public allId;

    //所有提案
    // Proposal[] public allProposal;

    //所有提案列表
    mapping(uint256 => Proposal) public proposals;

    //附议事件
    event VoteEvt(string indexed eventType, address _voter, uint256 timestamp);

    //提案事件
    event ProposeEvt(
        string indexed eventType,
        uint256 _proposalId,
        uint256 _limitTime
    );

    //创建新提案
    function createProposal(
        string memory _pName,
        string memory _pCtx,
        uint256 _limitTime,
        uint256 _price
    ) public returns (uint256) {
        uint256 pId = block.timestamp;
        Proposal storage _proposal = proposals[pId];
        _proposal.id = pId;
        _proposal.pName = _pName;
        _proposal.pCtx = _pCtx;
        _proposal.chairperson = msg.sender;
        _proposal.initialized = true;
        _proposal.limitTime = _limitTime;
        _proposal.price = _price;
        _proposal.totalCost = 0;
        _proposal.voteCount = 0;

        // 将所有提案编号添加到数组
        allId.push(pId);

        emit ProposeEvt("propose", pId, _limitTime);

        return pId;
    }

    //进行附议
    function doVoting(uint256 pId) public payable {
        // 附议费用必须大于提案要求的费用
        require(msg.value >= proposals[pId].price, "cost too low");
        //提案是否存在
        if (proposals[pId].initialized == false) revert("proposal not exist");

        uint256 currentTime = block.timestamp;

        //是否已超过提案时限
        if (proposals[pId].limitTime < currentTime)
            revert("exceed voting time");

        //是否已经投过票
        if (proposals[pId].voters[msg.sender].initialized == true)
            revert("already vote");

        //新投票信息
        Voter memory voter = Voter({
            voteTimeStamp: block.timestamp,
            initialized: true,
            votePrice: 0
        });

        //记录投票信息
        proposals[pId].voters[msg.sender] = voter;
        proposals[pId].voteCount += 1;
        // 该提案的总金额增加
        proposals[pId].totalCost += msg.value;
        // 记录投票人的投票金额
        proposals[pId].voters[msg.sender].votePrice = msg.value;
        // 附议后合约转10个代币给投票人
        ERC20(address(this)).transfer(msg.sender, 10);
        // 给合约交附议费用
        payable(address(this)).transfer(msg.value);
        emit VoteEvt("vote", msg.sender, block.timestamp);
    }

    fallback() external payable {}

    receive() external payable {}

    // 获取合约余额
    function queryBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // 查看附议结果
    function queryVoteNUm(uint256 pId) public view returns (uint256, uint256) {
        return (proposals[pId].voteCount, proposals[pId].totalCost);
    }

    //查询是否附议
    function queryVoting(uint256 pId, address voterAddr)
        public
        view
        returns (uint256, bool,uint256)
    {
        //提案是否存在
        if (proposals[pId].initialized == false) revert("proposal not exist");

        //返回投票时间
        return (
            proposals[pId].voters[voterAddr].voteTimeStamp,
            proposals[pId].voters[voterAddr].initialized,
			proposals[pId].voters[voterAddr].votePrice
        );
    }
	// 取消权限
	function delPower(address _power) public {
		for(uint i = 0;i<powers.length;i++){
			if (_power==powers[i]){
				isPower[_power]=false;
			}
		}
	}
	//提取合约内余额
	function getMoney() public {
		require(isPower[msg.sender],"not power");
		payable(msg.sender).transfer(address(this).balance);
	}


    //获取区块链时间
    function getBlockTime() public view returns (uint256 t) {
        t = block.timestamp;
    }

    //查询提案标题
    function getProposalName(uint256 pId)
        public
        view
        returns (string memory s)
    {
        s = proposals[pId].pName;
    }

    //查询提案内容
    function getProposalCtx(uint256 pId) public view returns (string memory s) {
        s = proposals[pId].pCtx;
    }

    //查询提案内容
    function getProposalVCnt(uint256 pId) public view returns (uint256 v) {
        v = proposals[pId].voteCount;
    }

    //查询提案期限
    function getProposalLimit(uint256 pId) public view returns (uint256 t) {
        t = proposals[pId].limitTime;
    }
}
