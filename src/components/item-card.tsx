import { FaEdit } from 'react-icons/fa';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import UpdateItemSheet from './update-item-sheet';

interface ItemCardProps {
  item: Item;
}

export default function ItemCard(props: ItemCardProps) {
  return (
    <div className='border p-2'>
      <img src={props.item.picture_b64} alt={props.item.name} className='w-full h-20 object-contain' />
      <div className='flex justify-between items-center mt-'>
        <h3 className='text-sm font-bold'>{props.item.name}</h3>
        <Sheet>
          <SheetTrigger asChild>
            <Button className='mt-2 flex justify-center items-center bg-transparent hover:bg-transparent' size='icon'>
              <FaEdit className='text-primary' />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <UpdateItemSheet item={props.item} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
