import { FaArrowRight } from 'react-icons/fa';
import RequiredItemBox from './required-item-box';

interface PlanBoxProps {
  plan: PlanResponse;
  gameId: string;
}

export default function PlanBox({ plan, gameId }: PlanBoxProps) {
  
  const isCraftable = plan.recipes.every(recipe => recipe.input_need_amount <= 0);

  return (
    <div className='mt-2 border-2 p-1 bg-accent rounded-lg border-primary mr-4 grid grid-cols-10'>
      <div className='col-span-8 grid grid-cols-8 gap-4'>
        {plan.recipes.map((recipe, i) => (
          <RequiredItemBox recipe={recipe} key={i} gameId={gameId} />
        ))}
      </div>
      <div className='col-span-1 flex justify-center items-center'>
        <FaArrowRight className='text-2xl' />
      </div>
      <div className='col-span-1'>
        <div className='col-span-1 flex flex-col justify-between items-center border-2 rounded-md border-foreground'>
          <img src={plan.output_item_picture_b64} alt={plan.output_item_name} className='w-16 h-16 mt-2' />
          <span className='text-sm my-1'>{plan.output_item_name}</span>
          <span className={`text-md mt-1 w-full text-center rounded-sm p-1 ${isCraftable ? 'bg-green-500' : 'bg-red-500' }`}>{plan.goal}</span>
        </div>
      </div>
    </div>
  );
}
