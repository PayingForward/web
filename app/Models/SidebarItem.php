<?php
namespace App\Models;

use JsonSerializable;

/**
 * Items in sidebar
 * 
 * @method string getId()
 * @method void setId(int $id)
 * @method string getTitle()
 * @method void setTitle(string $title)
 * @method string getLink()
 * @method void setLink(string $link)
 * @method SidebarItem[] getItems()
 * @method void setItems(SidebarItem[] $items)
 * @method SidebarItem getParent()
 * @method void setParent(SidebarItem $item)
 */
class SidebarItem extends SettersAndGetters implements JsonSerializable{
    /**
     * Unique id for the sidebar item
     *
     * @var string
     */
    protected $id;

    /**
     * Title of the sidebar item
     *
     * @var string
     */
    protected $title;

    /**
     * Link of the side bar item
     *
     * @var string
     */
    protected $link;

    /**
     * Childrens of sidebar. This property is checking if
     * not set a link
     * 
     * @var SidebarItem[]
     */
    protected $items = [];

    protected $properties = ['id','title','link','items'];


    public function jsonSerialize(){
        $ret = [
            'id'=>$this->id,
            'title'=>$this->title
        ];

        if(isset($this->link)){
            $ret['link']= $this->link;
        } else {
            $ret['items']= $this->items;
        }

        return $ret;
    }
}