<?php

return [

    "items" => [
        [
            "title" => "Countries",
            "id" => "country",
            "childrens" => [
                [
                    "title" => "Countries",
                    "id" => "country",
                    "link" => "/admin/form/country",
                ],
                [
                    "title" => "State",
                    "id" => "state",
                    "link" => "/admin/form/state",
                ],
                [
                    "title" => "Region",
                    "id" => 'region',
                    "link" => "/admin/form/region",
                ],
                [
                    "title" => "Area",
                    "id" => "area",
                    "link" => "/admin/form/area",
                ],
                [
                    "title" => "Town",
                    "id" => "town",
                    "link" => "/admin/form/town",
                ],
            ],
        ],
        [
            "title" => "Users",
            "id" => "user",
            "childrens" => [
                [
                    "title" => "User Type",
                    "id" => "user_type",
                    "link" => "/admin/form/user_type",
                ],
                [
                    'title'=>"Children",
                    'id'=>'children',
                    'link'=>'/admin/form/children'
                ],
                [
                    "title" => "User",
                    "id" => "user",
                    "link" => "/admin/form/user",
                ],
            ],
        ],
        [
            "title" => "Schools",
            "id" => "school",
            "childrens" => [
                [
                    "title" => "School",
                    "id" => "school",
                    "link" => "/admin/form/school",
                ],
                [
                    "title" => "Classes",
                    "id" => "school_class",
                    "link" => "/admin/form/school_class",
                ]
            ],
        ],
    ],
];
