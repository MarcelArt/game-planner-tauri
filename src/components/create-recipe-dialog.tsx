import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import itemApi from '@/api/item.api';
import { Label } from './ui/label';
import { useState } from 'react';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { FaTrash } from 'react-icons/fa';
import recipeApi from '@/api/recipe.api';
import { useToast } from '@/hooks/use-toast';

interface CreateRecipeDialogProps {
  item: Item;
}

export default function CreateRecipeDialog(props: CreateRecipeDialogProps) {
  const { item } = props;

  const [outputAmount, setOutputAmount] = useState(1);
  const [recipeDetails, setRecipeDetails] = useState([] as Array<RecipeDetailDto>);

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const itemsQuery = useQuery({
    queryKey: ['dropdown-items', item.game_id],
    queryFn: () => itemApi.getAllByGameId(item.game_id),
  });

  const createRecipe = useMutation({
    mutationFn: () => recipeApi.createWithDetails({ item_id: item.id, output_amount: outputAmount }, recipeDetails),
    onSuccess: () => {
      toast({
        title: 'Recipe saved',
        description: `Created recipe for ${item.name}`,
        variant: 'default',
      });

      queryClient.invalidateQueries({ queryKey: ['recipes-with-details', item.id] })

      setOutputAmount(1);
      setRecipeDetails([]);
    },
  });

  if (itemsQuery.isPending) return null;
  // if (!itemsQuery.data) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type='submit' variant='secondary'>
          Add Recipe
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90%]'>
        <DialogHeader>
          <DialogTitle>Create Recipe</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <img className='w-full h-24 col-span-4 object-contain' src={item.picture_b64} />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='output_amount' className='text-right'>
              Result Amount
            </Label>
            <Input
              id='output_amount'
              type='number'
              value={outputAmount}
              className='col-span-3'
              onChange={(e) => setOutputAmount(+e.target.value)}
            />
          </div>
        </div>
        <Separator className='mt-4' />
        <p className='font-bold mx-2'>Needs</p>
        <Button onClick={() => setRecipeDetails(addRecipeDetail(recipeDetails))}>Add Component</Button>
        <ScrollArea className='max-h-[480px]'>
          <div className='grid gap-4 py-4'>
            {recipeDetails.map((detail, i) => (
              <div className='flex flex-row-reverse'>
                <Button
                  className='h-full w-fit border-0 ml-2'
                  variant='outline'
                  onClick={() => handleRemoveRecipeDetail(recipeDetails, i, setRecipeDetails)}
                >
                  <FaTrash color='red' />
                </Button>
                <div className='flex flex-col space-y-2'>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='output_item' className='text-right'>
                      Component {i + 1}
                    </Label>
                    <Select
                      value={detail.item_id}
                      onValueChange={(itemId) => handleChangeInputItemRecipeDetails(recipeDetails, i, itemId, setRecipeDetails)}
                    >
                      <SelectTrigger className='col-span-3' id='output_item'>
                        <SelectValue placeholder='Select a fruit' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Component {i + 1}</SelectLabel>
                          {itemsQuery.data?.map((item) => (
                            <SelectItem value={item.id}>
                              <div className='flex flex-row items-center space-x-4'>
                                <img className='w-8 h-8' src={item.picture_b64} />
                                <p>{item.name}</p>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor={`input_amount-${i}`} className='text-right'>
                      Input Amount
                    </Label>
                    <Input
                      id={`input_amount-${i}`}
                      type='number'
                      value={detail.input_amount}
                      className='col-span-3'
                      onChange={(e) => handleChangeInputAmountRecipeDetails(recipeDetails, i, +e.target.value, setRecipeDetails)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='submit' onClick={() => createRecipe.mutate()}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const handleChangeInputAmountRecipeDetails = (
  recipeDetails: Array<RecipeDetailDto>,
  i: number,
  currentInputAmount: number,
  setRecipeDetails: (rds: Array<RecipeDetailDto>) => void
) => {
  recipeDetails[i].input_amount = currentInputAmount;
  setRecipeDetails([...recipeDetails]);
};

const handleChangeInputItemRecipeDetails = (
  recipeDetails: Array<RecipeDetailDto>,
  i: number,
  currentItemId: string,
  setRecipeDetails: (rds: Array<RecipeDetailDto>) => void
) => {
  recipeDetails[i].item_id = currentItemId;
  setRecipeDetails([...recipeDetails]);
};

const addRecipeDetail = (recipeDetails: Array<RecipeDetailDto>): Array<RecipeDetailDto> => {
  return [
    ...recipeDetails,
    {
      input_amount: 1,
      item_id: '',
    },
  ];
};

const handleRemoveRecipeDetail = (
  recipeDetails: Array<RecipeDetailDto>,
  i: number,
  setRecipeDetails: (rds: Array<RecipeDetailDto>) => void
) => {
  recipeDetails.splice(i, 1);
  setRecipeDetails([...recipeDetails]);
};
