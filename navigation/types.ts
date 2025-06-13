export type RootStackParamList = {
  Home: undefined;
  Cadastro: undefined;
  CadastroProfessor: undefined;
  LoginScreen: undefined;
  Perfil: undefined;
  Tab: undefined;
  EventosAluno: undefined;
  Notificacoes: undefined;
  EventoProfessor:undefined;
  Sobre:undefined;
  // Adicione todas as rotas aqui
};

// Extenda os tipos para usar autocomplete
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}