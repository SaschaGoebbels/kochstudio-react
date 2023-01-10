import React from 'react';

import './Content.css';

const Content = () => {
  //
  return (
    <div className="content content_page_1" id="content_page">
      <div className="content_spacer"></div>
      {/* <!-- POSITION RELATIV --> */}
      {/* <!--Recipe_List--> */}

      {/* <!--=====   Weeklyplan     ==============================================================================================================--> */}
      <div className="content__scroll_list" id="div_weekly_plan">
        <div className="content__ar_menulist">
          {/* <!--content__ar_menulist--> */}
          <h2>Hier entsteht ein Wochenplan ... :</h2>
        </div>
        {/* <!-- <div id="content__ar_shoopinglist">
                    <div className="grid content__li_item" id="content_ingredients_box">
                    </div>
                </div> --> */}
      </div>
      {/* <!--=====   Fav     ==============================================================================================================--> */}
      {/* // <!--Recipe_Fav_List--> */}
      <div className="content__scroll_list" id="div_menulist_fav">
        <ul className="content__ar_menulist" id="div_ar_menulist_fav">
          {/* <!-- <li className="content__menulist_item content__menulist_item_first" id="menulist0"> --> */}
          {/* </li> */}
        </ul>
      </div>
      {/* <!--=====   Shoopinglist     ==============================================================================================================--> */}
      <div className="content__scroll_list" id="content__scroll_shoppinglist">
        <div className="content__ar_menulist">
          <h2>Einkaufsliste:</h2>
        </div>
        <div id="content__ar_shooping_list">
          <div
            className="grid content__li_item"
            id="content_shooping_list_box"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Content;
