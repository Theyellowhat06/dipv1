import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'

export function middleware(request: NextRequest) {
  const { cookies } = request 
  const token = cookies.get('token');  
  const key = `mq0)l2t[8G}(=gvpOP$&oc'O,i_E^<`
  const url = request.nextUrl.clone()
  //console.log(url.pathname)
  if(url.pathname == '/'){
    url.pathname = '/login'
    //return NextResponse.redirect(url) 
  }
  // else{
  //   return NextResponse.redirect(new URL('/manage', request.url))
    // if(token != null){
    //       try {
    //         //verify(token, key)
    //         if(url == '/' || url == '/login'){
    //           return NextResponse.redirect(new URL('/manage', request.url))
    //         }
    //         return NextResponse.next()
    //       } catch (error) {
    //         return NextResponse.redirect(new URL('/login', request.url))
    //       }
    //     }else{
    //       return NextResponse.redirect(new URL('/login', request.url)) 
    //     }
  // }
  // }else{
  //   if(token != null){
  //     try {
  //       //verify(token, key)
  //       if(url == '/' || url == '/login'){
  //         return NextResponse.redirect(new URL('/manage', request.url))
  //       }
  //       return NextResponse.next()
  //     } catch (error) {
  //       return NextResponse.redirect(new URL('/login', request.url))
  //     }
  //   }else{
  //     return NextResponse.redirect(new URL('/login', request.url)) 
  //   }
  // }
  // if(url == '/'){
    
  // }
  // if(url.includes('/manage')){
  //   if(token != null){
  //     try {
  //       //verify(token, key)
  //       if(url == '/'){
  //         return NextResponse.redirect('/manage')
  //       }
  //       return NextResponse.next()
  //     } catch (error) {
  //       return NextResponse.redirect('/login')
  //     }
  //   }else{
  //     return NextResponse.redirect(new URL('/manage/teacher', request.url)) 
  //   }
  // }
  
  // return NextResponse.next()
}