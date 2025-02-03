import { Skeleton } from './ui/skeleton';

interface InventoryBoxSkeletonLoaderProps {
  repeat: number;
}

export default function InventoryBoxSkeletonLoader({ repeat }: InventoryBoxSkeletonLoaderProps) {
  let loaders: Array<JSX.Element> = [];
  for (let i = 0; i < repeat; i++) loaders.push(<Skeleton className='h-32 w-32 rounded-md' />);
  return <>{loaders.map((tsx) => tsx)}</>;
}
