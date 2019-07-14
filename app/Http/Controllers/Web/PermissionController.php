<?php
namespace App\Http\Controllers\Web;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use App\Models\SidebarItem;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class PermissionController extends Controller {
    /**
     * Collection of permissions
     *
     * @var Collection
     */
    protected $permissions;

    public function sidebar(){
        $user = User::with(['permissions','userType','userType.permissions'])->find(Auth::id());

        $permissions = $user->permissions;

        if($permissions->isEmpty()&&$user->userType){
            $permissions = $user->userType->permissions;
        }

        $this->permissions = $permissions;

        $sidebar = config("sidebar.items");

        $items = $this->getItems($sidebar);

        return \success_response(['items'=>$items]);

    }

    protected function getItems($items,$parents = []){
        $newItems = [];
        foreach ($items as $item){
            $id = $item['id'];
            $newParents = array_merge($parents,[$id]);

            $permission = $this->permissions->where('perm_path',implode('.',$newParents));

            if(!$permission->isEmpty()){
                $sidebarItem = new SidebarItem();
                $link = isset( $item['link'])?$item['link']:null;
                $childrens = isset( $item['childrens'])?$item['childrens']:null;

                $sidebarItem->setId(implode('.',$newParents));
                $sidebarItem->setTitle($item['title']);
                $sidebarItem->setLink($link);
                if(!$link&&$childrens){
                    $sidebarItem->setItems($this->getItems($childrens,$newParents));
                }

                $newItems[] = $sidebarItem;
            }
        }

        return $newItems;
    }
}