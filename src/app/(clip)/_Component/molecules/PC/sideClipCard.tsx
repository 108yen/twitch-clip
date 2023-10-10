import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import {
    Typography,
    Divider,
    Stack,
    MenuItem,
    SelectChangeEvent,
    Tooltip
} from '@mui/material'
import { useState } from 'react'

import { event } from '@/components/gtag'
import { BorderSelect } from '@/components/styledui'
import { Clip } from '@/models/clip'

import { ClipDoc } from '../../../../../models/clipDoc'
import getTabNameList from '../utils/getTabNameList'

import CardList from './cardList'

export default function SideClipCard(props: {
    clipDoc: ClipDoc
    setClickedClipUrl: (clip: Clip | undefined) => void
}) {
    const { clipDoc, setClickedClipUrl } = props

    const tabNameList = getTabNameList(clipDoc)
    //tab index
    const [tab, setTab] = useState(0)
    const currentTabName = tabNameList[tab]
    const currentClips = clipDoc[currentTabName] as Array<Clip>

    function handleTabChange(event: SelectChangeEvent<unknown>) {
        setTab(event.target.value as number)
    }

    return (
        <Stack direction='column' overflow='hidden' flexGrow={1}>
            <Stack
                direction='row'
                justifyContent='flex-end'
                alignItems='center'
            >
                <BorderSelect
                    size='small'
                    value={tab}
                    onChange={handleTabChange}
                >
                    {tabNameList.map((e, index) => (
                        <MenuItem key={index} value={index}>
                            {e}
                        </MenuItem>
                    ))}
                </BorderSelect>
            </Stack>
            <Tooltip followCursor placement='top' title='リスト表示にもどる'>
                <Stack
                    direction='row'
                    justifyContent='flex-start'
                    alignItems='center'
                    color='grey'
                    onClick={() => {
                        setClickedClipUrl(undefined)
                        event(`click`, {
                            label: `click_return_to_list_view`
                        })
                    }}
                    sx={{
                        cursor: `pointer`
                    }}
                >
                    <ChevronLeftIcon />
                    <Typography variant='subtitle1'>clips</Typography>
                </Stack>
            </Tooltip>
            <Divider />
            <CardList
                tab={currentTabName}
                clips={currentClips}
                setClickedClipUrl={setClickedClipUrl}
            />
        </Stack>
    )
}
