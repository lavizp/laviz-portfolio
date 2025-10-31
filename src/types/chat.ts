export type IChatMessage = {
  id: number;
  role: 'ai' | 'chat';
  message: string;
  type: IChatResponseFormat;
};

export type IChatResponseFormat =
  | 'projects'
  | 'about'
  | 'contact'
  | 'skills'
  | 'tech_stack';
