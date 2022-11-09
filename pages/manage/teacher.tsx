import Button from "../../comps/Button";
import Layout from "../../comps/Layout";
import Sidebar from "../../comps/Sidebar";

export default function teacher(){
    return(
        <Layout>
            <Sidebar choose='2'/>
            <div className="w-full flex flex-col items-center justify-center">
            <Button text="Нэмэх"></Button>
            <div>
            <table className="table-auto">
  <thead>
    <tr>
      <th>Код</th>
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
        </Layout>
    );
}