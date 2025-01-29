import gameApi from '@/api/game.api';
import UpdateGame from '@/components/update-game';
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router';

function UpdateGameView() {
  const { gameId } = useParams();

  const { data, isPending } = useQuery({
    queryKey: ['game', gameId],
    queryFn: () => gameApi.getById(gameId!),
  });

  const renderUpdateGame = () => {
    if (isPending || !gameId) {
      return null;
    }
    const game = data as Game;
    return (
      <div className='m-20'>
        <UpdateGame title={game.name} description={game.description} picture={game.picture_b64} gameId={gameId} />
      </div>
    );
  };

  return renderUpdateGame();
}

export default UpdateGameView;
