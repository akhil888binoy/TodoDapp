// SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;

import {Test, console} from "forge-std/Test.sol";
import {DeployTodoList} from "../../script/DeployTodoList.s.sol";
import {TodoList} from "../../src/TodoList.sol";

contract TodoListTest is Test {
    TodoList todoList;
    address USER = makeAddr("user");
    uint256 constant STARTINGBALANCE = 10 ether;

    function setUp() external {
        DeployTodoList deployTodoList = new DeployTodoList();
        todoList = deployTodoList.run();
        vm.deal(USER, STARTINGBALANCE);
    }

    function testAddTodo() public {
        //    vm.prank(msg.sender);
        //    todoList.add("buy limejuice");
        //    TodoList.Todo[] memory todos = todoList.getTodoList();
        //    assertEq(todos[0].todo , "buy limejuice");

        string memory todoText = "Write unit tests";
        vm.prank(msg.sender);
        TodoList.Todo memory newTodo = todoList.add(todoText);
        assertEq(newTodo.todo, todoText);
        assertEq(newTodo.isCompleted, false);
        TodoList.Todo[] memory todos = todoList.getTodoList();
        assertEq(todos.length, 1);
        assertEq(todos[0].todo, todoText);
    }

    function testCompletedTodo() public {
        string memory todoText = "Write unit tests";
        vm.prank(msg.sender);
        todoList.add(todoText);
        vm.prank(msg.sender);
        todoList.completedTodo(0);
        TodoList.Todo memory updatedTodo = todoList.getTodo(0);
        assertEq(updatedTodo.isCompleted, true);
    }

    function testRetrieveTodoList() public {
        string memory todoText1 = "Write unit tests";
        string memory todoText2 = "Write  tests";
        vm.prank(msg.sender);
        todoList.add(todoText1);
        vm.prank(msg.sender);
        todoList.add(todoText2);
        vm.prank(msg.sender);
        TodoList.Todo[] memory todos = todoList.getTodoList();
        assertEq(todos[0].todo, todoText1);
        assertEq(todos[1].todo, todoText2);
        assertEq(todos.length, 2);
    }

    function testGetSingleTodo() public {
        string memory todoText = "Write unit tests";
        vm.prank(msg.sender);
        todoList.add(todoText);
        TodoList.Todo memory updatedTodo = todoList.getTodo(0);
        assertEq(updatedTodo.todo, todoText);
        assertEq(updatedTodo.isCompleted, false);
    }

    function testOnlyOwnerCanAddTodo() public {
        string memory todoText = "Write unit tests";
        vm.expectRevert("Only the owner can call this function");
        todoList.add(todoText);
    }

    function testOnlyOwnerCanCompleteTodo() public {
        string memory todoText = "Write unit tests";
        vm.prank(msg.sender); //test contract address is stimulating the function
        todoList.add(todoText);
        vm.expectRevert("Only the owner can call this function");
        vm.prank(USER); //USER address is stimulating the function
        todoList.completedTodo(0);
    }
}
