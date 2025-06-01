import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  IconButton,
  Button,
  VStack,
  HStack,
  Spacer,
  Center,
  ButtonGroup,
  InputGroup,
  InputRightElement,
  useBreakpointValue,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, DeleteIcon, CalendarIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../component/loading";

const Task = () => {
  const navigate = useNavigate();
  const dateRef = useRef();
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [deadline, setDeadline] = useState("");
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const localUser = localStorage.getItem("user");
        if (localUser) {
          setUser(JSON.parse(localUser));
        } else {
          navigate("/");
          return;
        }

        const taskResponse = await fetch("https://arteedipobe-production.up.railway.app/tasks", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!taskResponse.ok) throw new Error("Failed to fetch tasks");

        const taskData = await taskResponse.json();
        setTasks(taskData.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [navigate]);

  const handleAddTask = async () => {
    try {
      const response = await fetch("https://arteedipobe-production.up.railway.app/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title: newTask, deadline }),
      });

      if (!response.ok) throw new Error("Failed to add task");
      const { data } = await response.json();
      setTasks([...tasks, data]);
      setNewTask("");
      setDeadline("");

      Swal.fire({
        title: "Success!",
        text: "Task added successfully!",
        icon: "success",
        confirmButtonText: "OK",
        background: "#0D1B2A",
        color: "#fff",
        confirmButtonColor: "#1E90FF",
        iconColor: "#FFD700",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add task",
        icon: "error",
        confirmButtonText: "OK",
        background: "#0D1B2A",
        color: "#fff",
        confirmButtonColor: "#1E90FF",
        iconColor: "#FFD700",
      });
    }
  };

  const handleToggleTask = async (taskId, isDone) => {
    try {
      const response = await fetch(`https://arteedipobe-production.up.railway.app/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to update task status");
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, isDone: !isDone } : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`https://arteedipobe-production.up.railway.app/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete task");
      setTasks(tasks.filter((task) => task.id !== taskId));

      Swal.fire({
        title: "Success!",
        text: "Task deleted successfully!",
        icon: "success",
        confirmButtonText: "OK",
        background: "#0D1B2A",
        color: "#fff",
        confirmButtonColor: "#1E90FF",
        iconColor: "#FFD700",
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Error!",
        text: "Failed to delete task",
        icon: "error",
        confirmButtonText: "OK",
        background: "#0D1B2A",
        color: "#fff",
        confirmButtonColor: "#1E90FF",
        iconColor: "#FFD700",
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAddTask();
  };

  const filteredTasks =
    filter === "completed"
      ? tasks.filter((task) => task.isDone)
      : filter === "incomplete"
      ? tasks.filter((task) => !task.isDone)
      : tasks;

  const getDeadlineStatus = (deadlineStr) => {
    if (!deadlineStr) return null;

    const today = new Date();
    const deadlineDate = new Date(deadlineStr);
    const diffTime =
      deadlineDate.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0)
      return {
        text: `Due in ${diffDays} day${diffDays > 1 ? "s" : ""}`,
        color: null,
      };
    if (diffDays < 0)
      return {
        text: `Overdue by ${Math.abs(diffDays)} day${
          Math.abs(diffDays) > 1 ? "s" : ""
        }`,
        color: "red.400",
      };
    return { text: "Due today", color: null };
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) return <Loading />;

  return (
    <Flex direction="column" minH="100vh" bg="blue.900">
      <Flex
        as="header"
        bg="blue.800"
        px="6"
        py="4"
        align="center"
        justify="space-between"
        boxShadow="md"
        position="sticky"
        top="0"
        zIndex="banner"
      >
        <Heading size="lg" color="secondary.500">
          Task Manager
        </Heading>
        {user && (
          <HStack spacing="4">
            {!isMobile && <Text fontWeight="medium">Hi, {user.name}</Text>}
            <Button size="sm" colorScheme="red" onClick={handleSignOut}>
              Sign Out
            </Button>
          </HStack>
        )}
      </Flex>

      <Flex direction={["column", "column", "row"]} p="6" gap="8">
        <Box flex="1">
          <Heading size="md" mb="8" color="secondary.500">
            New Task
          </Heading>
          <HStack>
            <Input
              type="text"
              placeholder="Add a new task"
              variant="flushed"
              focusBorderColor="secondary.500"
              color="white"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <InputGroup
              w={isMobile ? "full" : "60"}
              size={isMobile ? "sm" : "md"}
              position="relative"
            >
              <Input
                type="date"
                ref={dateRef}
                onChange={(e) => setDeadline(e.target.value)}
                value={deadline}
                position="absolute"
                opacity={0}
                zIndex={-1}
                pointerEvents="none"
              />
              <Input
                placeholder="Deadline"
                value={deadline}
                isReadOnly
                color="white"
                focusBorderColor="secondary.500"
              />
              <InputRightElement>
                <IconButton
                  aria-label="Pick date"
                  icon={<CalendarIcon />}
                  size="sm"
                  variant="ghost"
                  color="white"
                  _hover={{ filter: "brightness(0.9)" }}
                  onClick={() => dateRef.current?.showPicker?.()}
                />
              </InputRightElement>
            </InputGroup>
            <IconButton
              icon={<AddIcon />}
              colorScheme="primary"
              _hover={{
                filter: "brightness(0.9)",
              }}
              size="md"
              aria-label="Add task"
              onClick={handleAddTask}
            />
          </HStack>
        </Box>

        <Box flex="2">
          <ButtonGroup size="sm" spacing="2" mb="4">
            {["all", "incomplete", "completed"].map((item) => (
              <Button
                key={item}
                onClick={() => setFilter(item)}
                bg={filter === item ? "primary.500" : "secondary.500"}
                color={filter === item ? "white" : "black"}
                _hover={{
                  filter: "brightness(0.9)",
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Button>
            ))}
          </ButtonGroup>
          <VStack align="stretch" spacing="4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <Box
                  key={task.id}
                  p="3"
                  bg={task.isDone ? "blue.700" : "blue.800"}
                  borderRadius="md"
                >
                  <HStack>
                    {(() => {
                      const status = getDeadlineStatus(task.deadline);
                      return (
                        <Text
                          color="white"
                          textDecoration={task.isDone ? "line-through" : "none"}
                          textDecorationColor="secondary.500"
                        >
                          {task.title}{" "}
                          {!task.isDone && status && (
                            <Text as="span" color={status.color || "white"}>
                              - {status.text}
                            </Text>
                          )}
                        </Text>
                      );
                    })()}
                    <Spacer />
                    <HStack>
                      <Box
                        as="button"
                        onClick={() => handleToggleTask(task.id, task.isDone)}
                        borderWidth="2px"
                        borderColor="yellow"
                        borderRadius="md"
                        boxSize="8"
                        bg={task.isDone ? "secondary.500" : "transparent"}
                        _hover={{
                          filter: "brightness(0.9)",
                        }}
                      >
                        {task.isDone ? (
                          <CheckIcon boxSize={3} color="black" />
                        ) : null}
                      </Box>
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        aria-label="Delete task"
                        size="sm"
                        onClick={() => handleDeleteTask(task.id)}
                      />
                    </HStack>
                  </HStack>
                </Box>
              ))
            ) : (
              <Box p="3" boxShadow="sm" borderRadius="md" bg="blue.800">
                <Center>
                  <Text color="white">No Task Found</Text>
                </Center>
              </Box>
            )}
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Task;