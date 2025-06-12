/* eslint-disable */
interface SpeechRecognition extends EventTarget {
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((ev: SpeechRecognitionEvent) => any) | null;
  onend: (() => any) | null;
}

interface SpeechRecognitionEvent {
  results: {
    0: {
      0: { transcript: string };
    };
  };
}

declare var webkitSpeechRecognition: {
  new (): SpeechRecognition;
};

declare var SpeechRecognition: {
  new (): SpeechRecognition;
};
