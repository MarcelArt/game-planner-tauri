import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import gameApi from "@/api/game.api";
import { imagePicker } from "@/utils/fs";
import { FaFileImage } from "react-icons/fa";

interface UpdateGameProps {
  title: string;
  description: string;
  picture: string;
  gameId: string;
}

function UpdateGame(props: UpdateGameProps) {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [picture, setPicture] = useState(props.picture);
  const [base64, setBase64] = useState(props.picture);
  const { toast } = useToast();
  const queryClient = useQueryClient()

  const updateGame = useMutation({
    mutationFn: () => gameApi.update(props.gameId, { 
      name: title, 
      description,
      picture,
    }),
    onSuccess: () => {
      toast({
        title: 'Update success',
        description: `Updated game ${title} data`,
        variant: "default",
      })
      queryClient.invalidateQueries({ queryKey: ['game', props.gameId] })
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>Update {props.title} data</CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='flex flex-col w-full items-center'>
          <Button id='image' className='aspect-[16/9] h-[230px] bg-background border-2 border-accent hover:bg-accent' onClick={() => imagePicker({ setBase64, setPicture })}>
            {base64 ? <img src={base64}/> : <FaFileImage />}
          </Button>
        </div>
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
        <Button onClick={() => updateGame.mutate()}>Save changes</Button>
      </CardFooter>
    </Card>
  );
}

export default UpdateGame;