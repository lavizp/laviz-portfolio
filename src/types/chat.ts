export type IChatMessage = {
  id: number;
  role: 'ai' | 'chat';
  message: string;
  type: IChatResponseFormat;
  time: string;
};

export type IChatResponseFormat =
  | 'projects'
  | 'about'
  | 'contact'
  | 'skills'
  | 'tech_stack'
  | 'experience'
  | 'general'
  | 'not_found';
