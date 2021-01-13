import Switch from "react-switch";
import {Helmet} from 'react-helmet';

import ItemGrid from '../components/item-grid/';
import Menu from '../components/menu';
import useStateWithLocalStorage from '../hooks/useStateWithLocalStorage';
import Items from '../Items';
import Traders from '../data/traders';

import quests from '../data/quests.json';

function ItemTracker() {
    const [questData, setQuestData] = useStateWithLocalStorage('quests', quests.data);
    // const [questData, setQuestData] = useState(quests.data);
    // const [groupByQuest, setGroupByQuest] = useStateWithLocalStorage('groupByQuest', true);
    const [onlyFoundInRaid, setOnlyFoundInRaid] = useStateWithLocalStorage('onlyFoundInRaid', true);

    const handleItemClick = (item, event) => {
        event.preventDefault();

        const questDataCopy = [...questData];
        for(const quest of questDataCopy){
            if(quest.questId !== item.questId){
                continue;
            }

            for(const questItem of quest.items){
                if(item.id !== questItem.id){
                    continue;
                }

                questItem.count = questItem.count -1;
                break;
            }

            break;
        }

        setQuestData(questDataCopy);
    };

    return [
        <Helmet>
            <meta
                charSet='utf-8'
            />
            <title>
                Escape from Tarkov item tracker
            </title>
            <meta
                name = 'description'
                content = 'Track what items you need to Find in Raid for Escape from Tarkov quests'
            />
        </Helmet>,
        <Menu />,
        <div
            className="display-wrapper"
            style = {{
                backgroundColor: '#000',
                height: 'auto',
            }}
            key = {'display-wrapper'}
        >
            <div
                className="item-group-wrapper filter-wrapper"
            >
                <div
                    className = {'filter-content-wrapper'}
                >
                    {/* <label
                        className = {'filter-toggle-wrapper'}
                    >
                        <span
                            className = {'filter-toggle-label'}
                        >
                            Group by quest
                        </span>
                        <Switch
                            className = {'filter-toggle'}
                            onChange = {e => setGroupByQuest(!groupByQuest)}
                            checked = {groupByQuest}
                        />
                    </label> */}
                    <label
                        className = {'filter-toggle-wrapper'}
                    >
                        <span
                            className = {'filter-toggle-label'}
                        >
                            Only show Find in Raid
                        </span>
                        <Switch
                            className = {'filter-toggle'}
                            onChange = {e => setOnlyFoundInRaid(!onlyFoundInRaid)}
                            checked = {onlyFoundInRaid}
                        />
                    </label>
                    <label
                        className = {'filter-toggle-wrapper'}
                    >
                        <button
                            onClick = {() => setQuestData(quests.data)}
                        >
                            Reset all tracking
                        </button>
                    </label>
                </div>
            </div>
            {questData.sort((itemA, itemB) => {
                if(itemA.name && itemB.name){
                    return itemA.name.replace(/[^a-zA-Z0-9]/g, '').localeCompare(itemB.name.replace(/[^a-zA-Z0-9]/g, ''));
                }

                return 0;
            }).map((questData) => {
                const questItems = questData.items.map(questItemData => {
                    if(onlyFoundInRaid && !questItemData.foundInRaid){
                        return false;
                    }

                    if(questItemData.count <= 0){
                        return false;
                    }

                    return {
                        ...questItemData,
                        ...Items[questItemData.id],
                        onClick: handleItemClick,
                        questId: questData.questId,
                    };
                }).filter(Boolean);

                if(questItems.length === 0){
                    return false;
                }

                return <ItemGrid
                    key = {`loot-group-${questData.questId}`}
                    name = {questData.name || questData.questId}
                    subtitle = {Traders[questData.traderId].name}
                    items = {questItems}
                />
            })}
        </div>
    ];
}

export default ItemTracker;


