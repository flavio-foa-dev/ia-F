import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { api } from "@/lib/axios";

type Prompt = {
  id: string;
  title: string;
  template: string;
}

type PromptSelectorProps = {
  onPromptSelect: (template: string) => void;

}

export default function PromptSelect(props: PromptSelectorProps) {
  const [prompt, setPrompt] = useState<Prompt[] | null>(null)

  useEffect(() => {
    api.get('/prompts')
      .then(response => setPrompt(response.data))
  }, [])

  function handlePromptSelected(promptId: string) {
    const selectedPrompt = prompt?.find((item) => item.id === promptId)

    if(!selectedPrompt) {
      return
    }
    props.onPromptSelect(selectedPrompt.template)
  }

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..."/>
      </SelectTrigger>
      <SelectContent>
        {prompt?.map((item) => {
          return (
            <SelectItem value={item.id} key={item.id}>{item.title}</SelectItem>
          )

        })}

      </SelectContent>
    </Select>
  )
}
