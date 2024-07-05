import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { title: newTask, dueDate: new Date(), completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const openTaskDetails = (task) => {
    setSelectedTask(task);
  };

  const closeTaskDetails = () => {
    setSelectedTask(null);
  };

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <Button onClick={addTask}>Add Task</Button>
      </header>
      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li key={index} className="flex items-center justify-between p-2 border rounded">
            <div className="flex items-center space-x-2">
              <Checkbox checked={task.completed} onCheckedChange={() => toggleTaskCompletion(index)} />
              <span className={task.completed ? "line-through" : ""}>{task.title}</span>
            </div>
            <span>{format(task.dueDate, "P")}</span>
            <Button variant="link" onClick={() => openTaskDetails(task)}>Details</Button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="w-full"
        />
      </div>
      {selectedTask && (
        <Dialog open={!!selectedTask} onOpenChange={closeTaskDetails}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Task Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <Input value={selectedTask.title} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium">Due Date</label>
                <Input value={format(selectedTask.dueDate, "P")} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea className="w-full p-2 border rounded" rows="4" readOnly>
                  {selectedTask.description || "No description"}
                </textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="destructive" onClick={() => {
                  setTasks(tasks.filter(task => task !== selectedTask));
                  closeTaskDetails();
                }}>Delete</Button>
                <Button onClick={closeTaskDetails}>Close</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Index;
