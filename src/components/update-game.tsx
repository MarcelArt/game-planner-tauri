import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function UpdateGame() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Game</CardTitle>
        <CardDescription>Update Game</CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='space-y-1'>
          <Label htmlFor='title'>Title</Label>
          <Input id='title' value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='description'>Description</Label>
          <Input id='description' value={description} onChange={e => setDescription(e.target.value)} />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  );
}

export default UpdateGame;