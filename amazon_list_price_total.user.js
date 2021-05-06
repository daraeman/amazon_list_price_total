// ==UserScript==
// @name		Amazon List Price Total
// @namespace	amazon_list_price_total
// @description	Userscript that shows total price for an Amazon list
// @homepageURL	https://github.com/daraeman/amazon_list_price_total
// @author		daraeman
// @version		1.0
// @date		2021-05-05
// @include		/^https:\/\/[a-zA-Z]+\.amazon\.[a-zA-Z]+\/[a-zA-Z]+\/wishlist.*/
// @include		/^https:\/\/[a-zA-Z]+\.amazon\.[a-zA-Z\.]+\/[a-zA-Z]+\/registry\/wishlist.*/
// @downloadURL	https://github.com/daraeman/amazon_list_price_total/raw/master/amazon_list_price_total.user.js
// @updateURL	https://github.com/daraeman/amazon_list_price_total/raw/master/amazon_list_price_total.meta.js
// @grant		none
// ==/UserScript==

(function(){
	
	const total = Array.prototype.slice.call( document.querySelectorAll( `li[data-price]` ) ).reduce(
		( amount, el ) => ( amount + Math.max( 0, parseFloat( el.dataset.price ) ) )
		, 0.0
	);
		
	const coupons_total = Array.prototype.slice.call( document.querySelectorAll( `a` ) ).reduce(
		( amount, el ) => {
			if ( /^coupon-message/.test( el.id ) ) {
				const coupon_matches = el.textContent.match( /\$([\d.]+) coupon applied at checkout/ );
				console.log( "coupon_matches", coupon_matches );
				if ( coupon_matches && coupon_matches[1] ) {
					return ( amount + parseFloat( coupon_matches[1] ) );
				}
			}
			return amount;
		}
		, 0.0
	);
		
	const final_total = ( total - coupons_total );
		
	const parent = document.querySelector( `.list-header-container` );
	
	const total_el = document.createElement( "div" );
		total_el.textContent = "Total: $" + final_total.toFixed( 2 );
		total_el.style.fontWeight = "bold";
		total_el.style.padding = "0px 0px 10px";
	
	parent.appendChild( total_el );
		
})();