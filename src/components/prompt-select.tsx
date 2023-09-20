import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


export default function PromptSelect() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..."/>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="title">Titulo do Youtube</SelectItem>
      <SelectItem value="description">descricao do youtube</SelectItem>

     </SelectContent>
  </Select>
  )
}
