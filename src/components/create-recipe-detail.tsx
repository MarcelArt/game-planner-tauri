// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

// interface CreateRecipeDetailProps {
//     i: number;
//     items: Array<Item>;
//     recipeDetail: 
// }

// export function CreateRecipeDetail({ i, items }: CreateRecipeDetailProps) {
//   return (
//     <>
//       <div className='grid grid-cols-4 items-center gap-4'>
//         <Label htmlFor='output_item' className='text-right'>
//           Item {i + 1}
//         </Label>
//         <Select>
//           <SelectTrigger className='col-span-3' id='output_item'>
//             <SelectValue placeholder='Select a fruit' />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               <SelectLabel>Item {i + 1}</SelectLabel>
//               {items.map((item) => (
//                 <SelectItem value={item.id}>
//                   <div className='flex flex-row items-center space-x-4'>
//                     <img className='w-8 h-8' src={item.picture_b64} />
//                     <p>{item.name}</p>
//                   </div>
//                 </SelectItem>
//               ))}
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//       </div>
//       <div className='grid grid-cols-4 items-center gap-4'>
//         <Label htmlFor={`input_amount-${i}`} className='text-right'>
//           Input Amount
//         </Label>
//         <Input
//           id={`input_amount-${i}`}
//           type='number'
//           value={detail.input_amount}
//           className='col-span-3'
//           onChange={(e) => setRecipeDetails(recipeDetails)}
//         />
//       </div>
//     </>
//   );
// }
