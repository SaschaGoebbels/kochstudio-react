        <div className="input_header">
          <h2>Neuer Eintrag</h2>
          <input
            type="text"
            className="input_field"
            id="recipe_name"
            autocomplete="off"
          />
        </div>
        <div className="add_box " id="ingredients_main_box">
          <h2>Zutaten:</h2>
          <div className=" ingredient_input_list " id="ingredient_input_list">
            <div className="grid hide" id="ingredients_show_box">
              <p>Zwiebel</p>
              <p>3</p>
              <p> Stk.</p>
              <p>Zwixxxxebel</p>
              <p>3</p>
              <p>Stk.</p>
            </div>
          </div>
          <div className="ingredients_box" id="ingredients_box">
            <input
              type="text"
              className="input_field"
              id="ingredient"
              placeholder=" "
              onClick="this.select();"
            />
            <input
              type="number"
              className="input_field"
              id="ingredient_quatity"
              placeholder="Menge"
              onClick="this.select();"
            />
            <select name="unit" className="input_field" id="ingredient_unit">
              <option value="g">g</option>
              <option value="kg">kg</option>
              <option value="ml">ml</option>
              <option value="l">l</option>
              <option value="TL-gestr.">TL-gestr.</option>
              <option value="TL">TL</option>
              <option value="EL">EL</option>
              <option value="Stk.">Stk.</option>
              <option value="Priese">Priese</option>
              <option value="Tasse">Tasse</option>
              <option value="--">--</option>
            </select>
            <div
              className="btn_box ingredient_add_btn_position"
              id="btn_add_ingredient"
            >
              <ion-icon
                name="add-circle-outline"
                className="ingredient_add_btn"
                id="ingredient_add_btn"
              ></ion-icon>
            </div>
          </div>
        </div>
        <div className="add_box preperation_box" id="preperation_box">
          <h2>Zubereitung:</h2>
          <textarea
            name="prep"
            rows="20"
            cols="30"
            id="preperation"
            className="input_field"
          ></textarea>
        </div>