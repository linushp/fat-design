import DetailPage from "./detail-page";
import {DetailPageCardForm} from "./detail-page-card-form";
import {DetailPageFormItem} from "./detail-page-form-item";
import {DetailPageSummary} from "./detail-page-summary";
import {DetailPageSection} from "./detail-page-section";


DetailPage.CardForm = DetailPageCardForm as any;
DetailPage.FormItem = DetailPageFormItem as any;
DetailPage.Section = DetailPageSection as any;
DetailPage.Summary = DetailPageSummary as any;


export default DetailPage;
