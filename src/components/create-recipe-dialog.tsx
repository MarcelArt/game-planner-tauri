import { useQuery } from '@tanstack/react-query';
import { Button } from './ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import itemApi from '@/api/item.api';

interface CreateRecipeDialogProps {
  item: Item;
}

export default function CreateRecipeDialog(props: CreateRecipeDialogProps) {
  const { item } = props;
  const itemsQuery = useQuery({
    queryKey: ['dropdown-items', item.game_id],
    queryFn: () => itemApi.getAllByGameId(item.game_id),
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Recipe</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select a fruit' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
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
        <DialogFooter>
          <DialogClose asChild>
            <Button type='submit' onClick={() => console.log('clicked', props.item)}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
