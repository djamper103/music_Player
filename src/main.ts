
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


const start =async()=>{
  try{
    const PORT =process.env.PORT || 5000
    const app=await NestFactory.create(AppModule)

    await app.listen(PORT,()=>console.log(`server start ${PORT}`))
  }catch(e){
    console.log(e)
  }
}

start()