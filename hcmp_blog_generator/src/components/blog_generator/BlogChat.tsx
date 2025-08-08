import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../ui/select';
import { Label } from '../ui/label';



interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

function BlogChat() {
  const [title, setTitle] = useState('');
  const [audience, setAudience] = useState<'Recruiting' | 'Client'>('Recruiting');
  const [skill, setSkill] = useState<'Non-Skilled' | 'Skilled'>('Non-Skilled');
  const [primaryKeyword, setPrimaryKeyword] = useState('');
  const [secondaryKeyword, setSecondaryKeyword] = useState('');
  const [contentRequirements, setContentRequirements] = useState('');
  const [wordCount, setWordCount] = useState(800);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleGenerate = async () => {
    const history = messages;
    const response = await fetch("https://hcmpblog-server-7cdb5790849d.herokuapp.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        audience,
        skill,
        primary_keyword: primaryKeyword,
        secondary_keyword: secondaryKeyword,
        content_requirements: contentRequirements,
        word_count: wordCount,
        history,
      }),
    });

    if (!response.body) return;
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let reply = "";

    setMessages([...messages, { role: "assistant", content: "" }]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      const lines = chunk.split("\n").filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          reply += parsed.delta;
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "assistant", content: reply };
            return updated;
          });
        } catch (e) {
          console.error("Failed to parse chunk", e);
        }
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-4">
      <Label className='text-[2rem]'>HCMP Blog Prompt</Label>
      <Card>
        <CardContent className="p-4 space-y-4">
          <Label>Blog Title</Label>
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className="flex gap-2">
            <Label>Audience/Skill</Label>
            <Select value={audience} onValueChange={(val: 'Recruiting' | 'Client') => setAudience(val)}>
              <SelectTrigger><SelectValue placeholder="Audience" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Recruiting">Recruiting</SelectItem>
                <SelectItem value="Client">Client</SelectItem>
              </SelectContent>
            </Select>
            <Select value={skill} onValueChange={(val: 'Non-Skilled' | 'Skilled') => setSkill(val)}>
              <SelectTrigger><SelectValue placeholder="Skill" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Non-Skilled">Non-Skilled</SelectItem>
                <SelectItem value="Skilled">Skilled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Label>Primary Keyword</Label>
          <Input placeholder="Primary Keyword" value={primaryKeyword} onChange={(e) => setPrimaryKeyword(e.target.value)} />
          <Label>Secondary Keyword</Label>
          <Input placeholder="Secondary Keywords (comma-separated)" value={secondaryKeyword} onChange={(e) => setSecondaryKeyword(e.target.value)} />
          <Label>Content Requirements</Label>
          <Input placeholder="Content Requirements" value={contentRequirements} onChange={(e) => setContentRequirements(e.target.value)} />
          <Label>Word Count</Label>
          <Input type="number" placeholder="Word Count" value={wordCount} onChange={(e) => setWordCount(parseInt(e.target.value))} />
          <Button onClick={handleGenerate}>Generate Blog</Button>
        </CardContent>
      </Card>

      <Label className='text-[2rem]'>Generated Blog</Label>
      <Card className='mb-[100px]'>
        <CardContent className="p-4 h-96 overflow-y-auto whitespace-pre-wrap">
          {messages.map((msg, idx) => (
            <div key={idx} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
              <p className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl inline-block">{msg.content}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default BlogChat;
