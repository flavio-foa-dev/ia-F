import { Button } from "./components/ui/button";
import { FileVideo, Github, Upload, Wand2 } from "lucide-react"
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./components/ui/select";
import { Slider } from "./components/ui/slider";


export function App() {

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

                <p className="text-sm text-muted-foreground">Lembre-se voce pode utilizar a variavel <code className="text-amber-400">&#123;transcription&#125;</code> para adicionar o conteudo da transcricao do video
                </p>
              </div>

              <aside className="w-80 space-y-6">
                <form className="space-y-6">
                  <label
                    htmlFor="video"
                    className="flex border rounded-md aspect-video cursor-pointer text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
                  >
                    <FileVideo className="w-5 h-5"/>
                    Selecione um video
                  </label>

                  <input
                    type="file"
                    name=""
                    id="video"
                    accept="video/mp4"
                    className="sr-only"
                  />
                   <Separator />
                   <div className="space-y-2">
                    <Label htmlFor="transcription_prompt">Prompt of transcription</Label>
                    <Textarea
                      id="transcription_prompt"
                      className="h-20 leading-relaxed resize-none"
                      placeholder="inclua palavras chaves mencionada no video separadas por virgulas ( , )"
                    />
                   </div>
                   <Button type="submit" className="w-full">
                    carregar video
                    <Upload className="w-4 h-4 ml-2 " />

                   </Button>
                </form>

                <Separator />
                <form className="space-y-6">

                <div className=" space-y-2">
                    <Label>Prompt</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um prompt..."/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="title">Titulo do Youtube</SelectItem>
                        <SelectItem value="description">descricao do youtube</SelectItem>

                      </SelectContent>
                    </Select>
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
                    <Slider min={0} max={1} step={0.1}/>
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


