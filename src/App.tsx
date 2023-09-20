import { Button } from "./components/ui/button";
import { Github, Wand2 } from "lucide-react"
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import VideoInputForm from "./components/video-imput-form";
import PromptSelect from "./components/prompt-select";
import { useState } from "react";


export function App() {
  const [ temperature, setTemperature ] = useState(0.5)

  function handlePromptSelect(template: string){
    console.log(template);
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="px-6 py-3 flex items-center justify-between border-b">
          <h1 className="text-xl font-bold">upload.ia</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Desenvolvido FOA</span>
            <Separator orientation="vertical" className="h-6"/>
            <Button variant="outline">
              <Github className="w-4 h-4 mr-2" />
              Github</Button>
          </div>
        </div>

        <main className="flex-1 p-6 flex gap-6">
          <div className="flex flex-col flex-1 gap-4">
            <div className="grid grid-flow-row-2 gap-4 flex-1">
              <Textarea
                className="resize-none p-4 leading-relaxed"
                placeholder="inclua o prompt para IA..."
                />
              <Textarea
                className="resize-none p-4 leading-relaxed"
                placeholder="Resultado gerado pela IA..."
                readOnly
              />
            </div>
            <p
              className="text-sm text-muted-foreground"
            >
              Lembre-se voce pode utilizar a variavel <code className="text-amber-400">&#123;transcription&#125;</code> para adicionar o conteudo da transcricao do video
            </p>
          </div>
          <aside className="w-80 space-y-6">
            <VideoInputForm/>
            <Separator />
            <form className="space-y-6">
              <div className=" space-y-2">
                <Label>Prompt</Label>
                <PromptSelect onPromptSelect={handlePromptSelect}/>
              </div>
              <div className=" space-y-2">
                <Label>Modelo</Label>
                <Select disabled defaultValue="gpt3.5">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                  </SelectContent>
                </Select>
                <span className="block text-xs text-muted-foreground italic">Em breve novas IAs</span>
              </div>
              <Separator />
              <div className="space-y-4">
                <Label>Temperatura</Label>
                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                  value={[temperature]}
                  onValueChange={(value)=> setTemperature(value[0])}
                />
                <span className="block text-xs text-muted-foreground italic leading-relaxed">
                  Valores mais altos tendem a deixar o sesultado mais criativo e com possiveis erros.
                </span>
              </div>
              <Separator />
              <Button type="submit" className=" w-full">
                Executar
                <Wand2 className="w-4 h-4 ml-2 "/>
              </Button>
            </form>
          </aside>
        </main>
      </div>
    </>
  )
}


