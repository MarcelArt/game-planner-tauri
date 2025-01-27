// import { useState } from 'react';
// import { invoke } from '@tauri-apps/api/core';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { ThemeProvider } from './components/theme-provider';
import Layout from './app/layout';
import GamesView from './views/games-view';
import InventoryView from './views/inventory-view';
import GameDetailView from './views/game-detail-view';

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
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <div className='w-full h-screen'>
          <Layout>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<GamesView />} />
                <Route path="/game/:gameId" element={<GameDetailView />} />
                <Route path="/inventory" element={<InventoryView />} />
              </Routes>
            </BrowserRouter>
          </Layout>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
