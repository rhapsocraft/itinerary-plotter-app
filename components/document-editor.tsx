import { RichText, Toolbar, useEditorBridge } from '@10play/tentap-editor';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type DocumentProps = {
  document: {
    id?: string;
    content?: string;
  };
};

export type DocumentForm = {
  id?: string;
  content?: string;
  attachments?: File[];
};

export default function DocumentEditor({ document }: DocumentProps) {
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: document.content,
  });

  async function submit() {
    const form: DocumentForm = {
      content: await editor.getHTML(),
    };
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {Platform.OS === 'web' && <Toolbar editor={editor} />}
      <RichText editor={editor} />
      {Platform.OS !== 'web' && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            position: 'absolute',
            width: '100%',
            bottom: 0,
          }}
        >
          <Toolbar editor={editor} />
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}
