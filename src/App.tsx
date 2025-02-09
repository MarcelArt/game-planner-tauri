// import { useState } from 'react';
// import { invoke } from '@tauri-apps/api/core';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from './components/theme-provider';
import Layout from './app/layout';
import GamesView from './views/games-view';
import GameDetailView from './views/game-detail-view';
import UpdateGameView from './views/update-game-view';
import ItemsView from './views/items-view';
import InventoryView from './views/inventory-view';
import PlansView from './views/plans-view';
import { TooltipProvider } from './components/ui/tooltip';

const queryClient = new QueryClient();

function App() {
  // const [greetMsg, setGreetMsg] = useState('');
  // const [name, setName] = useState('');

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   setGreetMsg(await invoke('greet', { name }));
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <div className='w-full h-screen'>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<GamesView />} />
                <Route
                  path='/game/:gameId'
                  element={
                    <Layout>
                      <GameDetailView />
                    </Layout>
                  }
                />
                <Route
                  path='/game/:gameId/update'
                  element={
                    <Layout>
                      <UpdateGameView />
                    </Layout>
                  }
                />
                <Route
                  path='/game/:gameId/item'
                  element={
                    <Layout>
                      <ItemsView />
                    </Layout>
                  }
                />
                <Route
                  path='/game/:gameId/inventory'
                  element={
                    <Layout>
                      <InventoryView />
                    </Layout>
                  }
                />
                <Route
                  path='/game/:gameId/plan'
                  element={
                    <Layout>
                      <PlansView />
                    </Layout>
                  }
                />
              </Routes>
            </BrowserRouter>
          </div>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
