export type RootStackParamList = {
  Home: undefined;
  CadastroProfessor: undefined;
  Login: undefined;
  Perfil: undefined;
  Tab: undefined;
  EventosAluno: undefined;
  Notificacoes: undefined;
  EventoProfessor:undefined;

  // Adicione todas as rotas aqui
};

// Extenda os tipos para usar autocomplete
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}