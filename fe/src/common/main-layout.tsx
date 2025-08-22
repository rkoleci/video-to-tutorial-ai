// layouts/MainLayout.tsx
import AppContainer from '../common/app-container';
import { Outlet } from 'react-router-dom';

interface IProps {
  children?: React.ReactNode;
}

export default function MainLayout({ children }: IProps) {
  return (
     <AppContainer>
      <Outlet />
      {children}
    </AppContainer>
  );
}
