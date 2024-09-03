// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoList {
    struct Task {
        uint id;
        string content;
        bool completed;
        uint256 timestamp;
    }

    mapping(address => Task[]) private userTasks;
    mapping(address => uint) private taskCount;

    event TaskCreated(uint id, string content, bool completed, uint256 timestamp);
    event TaskCompleted(uint id);

    function createTask(string memory _content) public {
        uint taskId = taskCount[msg.sender];
        userTasks[msg.sender].push(Task(taskId, _content, false, block.timestamp));
        taskCount[msg.sender]++;
        emit TaskCreated(taskId, _content, false, block.timestamp);
    }

    function toggleCompleted(uint _id) public {
        require(_id < taskCount[msg.sender], "Task does not exist");
        Task storage task = userTasks[msg.sender][_id];
        task.completed = !task.completed;
        emit TaskCompleted(_id);
    }

    function getTasks() public view returns (Task[] memory) {
        return userTasks[msg.sender];
    }
}