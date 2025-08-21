// layouts/MainLayout.tsx
import AppContainer from '../common/app-container';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <AppContainer>
      <Outlet />
    </AppContainer>
  );
}
