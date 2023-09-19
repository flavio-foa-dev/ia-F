
import { Separator } from './ui/separator'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { FileVideo, Upload } from "lucide-react"
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react'
import { loadFFmpeg } from '@/lib/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import { api } from '@/lib/axios'


export default function VideoInputForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const prompInpuRef = useRef<HTMLTextAreaElement>(null)

  function handleFileSelectd(e: ChangeEvent<HTMLInputElement>){
    const { files } = e.currentTarget

    if(!files) {
      return
    }

    const selectedFiles = files.item(0)
    setVideoFile(selectedFiles)
  }

  async function convertVideoToAudio(video: File){
    console.log("Converting video to Audio...")

    const ffmpeg = await loadFFmpeg()
    await ffmpeg.writeFile("input.mp4", await fetchFile(video))

    // ffmpeg.on("log", (log) => {
    //   console.log(log)
    // })



    ffmpeg.on("progress", (progress) => {
      console.log("convert progress", + Math.round(progress.progress * 100))
    })

    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '48k',
      // '-acodec',
      // 'libmp3lame',
      'output.mp3'
    ])

    const data = await ffmpeg.readFile('output.mp3')

    const audioFileBlob = new Blob([data], { type: 'audio/mpeg' })

    const audioFile = new File([audioFileBlob], 'audio.mp3', {
      type: 'audio/mpeg',
    })

    console.log("Convert finished")
    return audioFile
  }

  async function handleUploadVideo(e: FormEvent<HTMLFormElement>){
    e.preventDefault()

    const prompt = prompInpuRef.current?.value

    if(!videoFile){
      return
    }

    const audioFile = await convertVideoToAudio(videoFile)

    const data = new FormData()
    data.append('file', audioFile)

    const response = await api.post('/videos', data)
    const videoId = response.data.video.id

    // ocalhost:3333/videos/58251537-59fc-4371-8700-400712d8903b/transcription
    await api.post(`/videos/${videoId}/transcription`, {
      prompt,
    })

    console.log("meu arquico chegou e finalizou")
  }

  const previeURL = useMemo(()=> {
    if(!videoFile) {
      return null
    }

    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <form onSubmit={handleUploadVideo} className="space-y-6">
      <label
        htmlFor="video"
        className="relative flex border rounded-md aspect-video cursor-pointer text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
      >
        {previeURL ? (
          <video
            src={previeURL}
            controls={false}
            autoPlay={false}
            muted={false}

            className="pointer-events-none absolute inset-0"/>
         ) :(
        <>
          <FileVideo className="w-5 h-5"/>
          Selecione um video
        </>
          )
        }
      </label>

      <input
        type="file"
        name=""
        id="video"
        accept="video/mp4"
        className="sr-only"
        onChange={handleFileSelectd}
      />
        <Separator />
        <div className="space-y-2">
        <Label htmlFor="transcription_prompt">Prompt of transcription</Label>
        <Textarea
          ref={prompInpuRef}
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
  )
}
