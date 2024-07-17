// SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;

contract TodoList {
    struct Todo {
        string todo;
        bool isCompleted;
    }

    address public owner;
    Todo[] private todos;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function add(string memory newtodo) external onlyOwner returns (Todo memory) {
        todos.push(Todo({todo: newtodo, isCompleted: false}));
        return todos[todos.length - 1];
    }

    function completedTodo(uint256 todoIndex) external onlyOwner {
        todos[todoIndex].isCompleted = true;
    }

    function getTodoList() external view returns (Todo[] memory) {
        return todos;
    }

    function getTodo(uint256 todoIndex) external view returns (Todo memory) {
        return todos[todoIndex];
    }
}
