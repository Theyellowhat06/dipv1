import Link from "next/link";
import Button from "../../comps/Button";
import MainLayout from "../../comps/layouts/main";
import Layout from "../../comps/layouts/main";
import Sidebar from "../../comps/Sidebar";
import type { ReactElement } from 'react'

import type { NextPageWithLayout } from '../_app'
import Profilebar from "../../comps/Profilebar";

const Page: NextPageWithLayout = () => {
    return(
            <div className="w-full flex flex-col items-center justify-center">
              <Link href={'/manage/add/student'}>
              <Button text="Нэмэх"></Button>
              </Link>
            
            <div className="bg-red-500">
            <table className="table-auto">
  <thead>
    <tr>
      <th >Код</th>
      <th>Овог</th>
      <th>Нэр</th>
      <th>Төрөл</th>
      <th>Засах</th>
      <th>Устгах</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>BB210901</td>
      <td>ТӨГӨЛДӨР</td>
      <td>ХУЛАН</td>
      <td>Бүтэн цаг</td>
      <td>Засах</td>
      <td>Устгах</td>
    </tr>
    <tr>
      <td>BB210902</td>
      <td>БИЛГҮҮН</td>
      <td>НОМИНЭРДЭНЭ</td>
      <td>Бүтэн цаг</td>
      <td>Засах</td>
      <td>Устгах</td>
    </tr>
    <tr>
      <td>BH211001</td>
      <td>МӨНХЭРДЭНЭ</td>
      <td>НАНДИНЭРДЭНЭ</td>
      <td>Хагас цаг</td>
      <td>Засах</td>
      <td>Устгах</td>
    </tr>
    <tr>
      <td>BB210801</td>
      <td>БАТБАЯР</td>
      <td>МИШЭЭЛ</td>
      <td>Бүтэн цаг</td>
      <td>Засах</td>
      <td>Устгах</td>
    </tr>
  </tbody>
</table>
            </div>
            </div>
    );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout index={3}>
          {page}
    </MainLayout>
  )
}

export default Page