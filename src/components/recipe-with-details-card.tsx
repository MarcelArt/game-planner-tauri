import { FaArrowRight } from 'react-icons/fa';
import { Separator } from './ui/separator';
import { UpdateRecipeDialog } from './update-recipe-dialog';

interface RecipeWithDetailsCardProps {
  recipe: RecipeWithDetail;
  item: Item;
}

export default function RecipeWithDetailsCard({ recipe, item }: RecipeWithDetailsCardProps) {
  return (
    <>
      <Separator className='my-2' />
      <div className='mt-2 border-2 p-1 bg-accent rounded-lg border-primary mr-4'>
        <div className='grid grid-cols-5 '>
          <div className='col-span-3 grid grid-cols-3 gap-1'>
            {recipe.recipe_details.map((detail) => (
              <div className='flex flex-col justify-between items-center border-2 rounded-md border-foreground'>
                <img src={detail.item_picture_b64} alt='Required Item' className='w-8 h-8' />
                <span>{detail.input_amount}</span>
              </div>
            ))}
          </div>
          <div className='col-span-1 flex items-center justify-between text-xl'>
            <Separator orientation='vertical' className='mx-2' />
            <FaArrowRight />
            <Separator orientation='vertical' className='mx-2' />
          </div>
          <div className='col-span-1 flex flex-col'>
            <div className='flex flex-col justify-between items-center border-2 rounded-md border-foreground'>
              <img src={recipe.item_picture_b64} alt='Resulting Item' className='w-8 h-8' />
              <span>{recipe.output_amount}</span>
            </div>
          </div>
        </div>
        <div className='flex flex-row-reverse'>
          <UpdateRecipeDialog recipeWithDetail={recipe} item={item} />
        </div>
      </div>
    </>
  );
}
