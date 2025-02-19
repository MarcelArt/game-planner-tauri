import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button } from './ui/button';
import { DialogHeader, DialogFooter, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from './ui/dialog';
import { Input } from './ui/input';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import itemApi from '@/api/item.api';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { useState } from 'react';
import recipeApi from '@/api/recipe.api';
import { useToast } from '@/hooks/use-toast';

interface UpdateRecipeDialogProps {
  item: Item;
  recipeWithDetail: RecipeWithDetail;
}

export function UpdateRecipeDialog({ item, recipeWithDetail }: UpdateRecipeDialogProps) {
  const [recipe, setRecipe] = useState(recipeWithDetail as Recipe);
  const [recipeDetails, setRecipeDetails] = useState(recipeWithDetail.recipe_details);

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const itemsQuery = useQuery({
    queryKey: ['dropdown-items', item.game_id],
    queryFn: () => itemApi.getAllByGameId(item.game_id),
  });

  const updateRecipe = useMutation({
    mutationFn: () =>
      recipeApi.updateWithDetails({
        id: recipe.id,
        item_id: recipe.item_id,
        output_amount: recipe.output_amount,
        item_picture: item.picture,
        item_picture_b64: item.picture_b64,
        recipe_details: recipeDetails,
      }),
    onSuccess: () => {
      console.log('recipe :>> ', recipe);
      toast({
        title: 'Recipe saved',
        description: `Updated recipe for ${item.name}`,
        variant: 'default',
      });
      queryClient.invalidateQueries({ queryKey: ['recipes-with-details', item.id] });
      setRecipe({ ...recipe });
      setRecipeDetails([...recipeDetails]);
    },
  });

  const handleChangeOutputAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    recipe.output_amount = +e.target.value;
    setRecipe({ ...recipe });
  };

  const handleAddRecipeComponent = (): (() => void) => {
    console.log('recipe.recipe_details :>> ', recipeDetails);
    return () => {
      setRecipeDetails([
        ...recipeDetails,
        {
          input_amount: 1,
          item_id: '',
          recipe_id: recipe.id,
          id: '',
          item_picture: '',
          item_picture_b64: '',
        },
      ]);
    };
  };

  const handleRemoveRecipeComponent = (i: number): (() => void) => {
    return () => {
      recipeDetails.splice(i, 1);
      setRecipeDetails([...recipeDetails]);
    };
  };

  const handleDropdownItemChanged = (i: number): ((itemId: string) => void) => {
    return (itemId: string) => {
      recipeDetails[i].item_id = itemId;
      setRecipeDetails([...recipeDetails]);
    };
  };

  const handleChangeInputAmount = (i: number): ((e: React.ChangeEvent<HTMLInputElement>) => void) => {
    return (e) => {
      recipeDetails[i].input_amount = +e.target.value;
      setRecipeDetails([...recipeDetails]);
    };
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' className='border-0 text-foreground hover:border-0 hover:text-muted-foreground mt-2'>
          <FaEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90%]'>
        <DialogHeader>
          <DialogTitle>Update Recipe</DialogTitle>
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
              value={recipe.output_amount}
              className='col-span-3'
              onChange={handleChangeOutputAmount}
            />
          </div>
        </div>
        <Separator className='mt-4' />
        <p className='font-bold mx-2'>Needs</p>
        <Button onClick={handleAddRecipeComponent()}>Add Component</Button>
        <ScrollArea className='max-h-[480px]'>
          <div className='grid gap-4 py-4'>
            {recipeDetails.map((detail, i) => (
              <div key={i} className='flex flex-row-reverse'>
                <Button className='h-full w-fit border-0 ml-2' variant='outline' onClick={handleRemoveRecipeComponent(i)}>
                  <FaTrash color='red' />
                </Button>
                <div className='flex flex-col space-y-2'>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='output_item' className='text-right'>
                      Component {i + 1}
                    </Label>
                    <Select value={detail.item_id} onValueChange={handleDropdownItemChanged(i)}>
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
                      onChange={handleChangeInputAmount(i)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='submit' onClick={() => updateRecipe.mutate()}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
