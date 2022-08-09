import { atom } from "recoil"

export const tableStyle = atom({
    key: "tableStyle",
    default: 'grid grid-cols-7 gap-4 place-items-center ',
})
// hover:divide-solid 자식요소만 적용 어케
// divide-dashed