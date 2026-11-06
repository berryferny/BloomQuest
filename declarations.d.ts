declare module 'redux-persist/integration/react' {
  import { ReactNode } from 'react';
    import { Persistor } from 'redux-persist';
  export class PersistGate extends React.Component<{
    persistor: Persistor;
    loading?: ReactNode;
    children?: ReactNode;
  }> {}
}